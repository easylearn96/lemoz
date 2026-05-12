import { BookingStatus } from "../../domain/entities/BookingEntities.js";
import { TransactionPurpose } from "../../domain/entities/transactionEntities.js";

export class CancelBookingUseCase {
    constructor(
        _bookingRepository,
        _walletRepository,
        _adminWalletRepository,
        _trasationRepository,
        _vehicleRepository
    ){
        this._bookingRepository = _bookingRepository;
        this._walletRepository = _walletRepository;
        this._adminWalletRepository = _adminWalletRepository;
        this._trasationRepository = _trasationRepository;
        this._vehicleRepository = _vehicleRepository;
    }

    async execute({ booking_id, cancellation_reason }) {
        const booking = await this._bookingRepository.findByBookingId(booking_id);
        if (!booking) {
            throw new Error('Booking not found');
        }
        if (booking.status === BookingStatus.Cancelled) {
            throw new Error('Booking is already cancelled');
        }

        if (booking.status === BookingStatus.Completed) {
            throw new Error('Cannot cancel a completed booking');
        }

        if (booking.status === BookingStatus.ongoing) {
            throw new Error('Cannot cancel an ongoing booking');
        }

        const vehicle = await this._vehicleRepository.getVehicle(booking.vehicle_id.toString());
        if (!vehicle) {
            throw new Error('Vehicle not found');
        }

        const ownerId = vehicle.owner_id.toString();
        const userId = booking.user_id.toString();
        const totalAmount = booking.total_amount;

        const userRefund = Math.round(totalAmount * 0.7);
        const ownerCompensation = Math.round(totalAmount * 0.3);

        try {
            // Update booking finance data for cancellation
            const financeUpdate = {
                security_deposit: userRefund,
                owner_earnings: ownerCompensation, 
            };

            await this._bookingRepository.cancelBooking(booking_id, cancellation_reason, financeUpdate);            
            await this._adminWalletRepository.updateWalletBalance(-totalAmount);
            const userTransaction = await this._trasationRepository.create({
               from: 'admin',   
               to: userId,    
               amount: userRefund,
               purpose: TransactionPurpose.refund,
               bookingId: booking_id,
               transactionType:'credit'
        });            
            if (userTransaction && userTransaction._id) {
                await this._adminWalletRepository.addTransaction(userTransaction._id.toString());
            }
            await this._walletRepository.updateWallet(userId, userRefund);
            if (userTransaction && userTransaction._id) {
                await this._walletRepository.addTransaction(userId, userTransaction._id.toString());
            }
            const ownerTransaction = await this._trasationRepository.create({
               from: 'admin',   
               to: ownerId,    
               amount: ownerCompensation,
               purpose: TransactionPurpose.refund,
               bookingId: booking_id,
               transactionType:'credit'
            });            
            if (ownerTransaction && ownerTransaction._id) {
                await this._adminWalletRepository.addTransaction(ownerTransaction._id.toString());
            }
            await this._walletRepository.updateWallet(ownerId, ownerCompensation);
            if (ownerTransaction && ownerTransaction._id) {
                await this._walletRepository.addTransaction(ownerId, ownerTransaction._id.toString());
            }
            return {
                success: true,
                message: 'Booking cancelled successfully',
                refund_amount: userRefund
            };
        } catch (error) {
            console.error('Cancel booking error:', error);
            throw error;
        }
    }
}

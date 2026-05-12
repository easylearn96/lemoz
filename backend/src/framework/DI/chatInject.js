import { ChatRepository } from "../../adapters/repository/chat/chatRepository.js";
import { MessageRepository } from "../../adapters/repository/message/messageRepository.js";
import { BookingRepository } from "../../adapters/repository/booking/bookingRepository.js";
import { FindOrCreateChatUsecase } from "../../useCases/chat/FindOrCreateChatUsecase.js";
import { EnableChatUsecase } from "../../useCases/chat/EnableChatUsecase.js";
import { CreateMessageUseCase } from "../../useCases/message/createMessageUsecase.js";
import { GetMessagesUsecase } from "../../useCases/message/getMessagesUsecase.js";
// Controllers
import { GetMessageController } from "../../adapters/controllers/message/getMessageController.js";
import { MarkMessageAsSeenController } from "../../adapters/controllers/message/markMessageAsSeenController.js";
import { GetChatController } from "../../adapters/controllers/chat/getChatController.js";
import { FindOrCreateChatController } from "../../adapters/controllers/chat/FindOrCreateChatController.js";
import { EnableChatController } from "../../adapters/controllers/chat/EnableChatController.js";
import { GetChatUsecase } from "../../useCases/chat/getchatsOfUser.js";
import { UpdateLastMessageUseCase } from "../../useCases/message/UpdateLastMessageUseCase.js";
import { CreateNotificationUsecase } from "../../useCases/notification/CreateNotificationUsecase.js";
import { NotificationRepository } from "../../adapters/repository/notification/notificationRepository.js";
import { NotificationManagerAdapter } from "../../adapters/controllers/notification/NotificationSocketIOAdapter.js";
// Repositories
const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();
const bookingRepository = new BookingRepository();
export const notificationRepository =  new NotificationRepository()
// Use Cases
 const findOrCreateChatUsecase = new FindOrCreateChatUsecase(chatRepository);
export const createMessageUseCase = new CreateMessageUseCase(messageRepository);
 const getMessagesUsecase = new GetMessagesUsecase(messageRepository);
 const getChatUsecase = new GetChatUsecase(chatRepository);
 const enableChatUsecase = new EnableChatUsecase(bookingRepository);
 const notificationManagerAdapter = new NotificationManagerAdapter()
export const updateLastMessageUseCase = new UpdateLastMessageUseCase(chatRepository);
export const createNotificationUsecase = new CreateNotificationUsecase(notificationRepository,notificationManagerAdapter)

// Controllers
export const createChatController = new FindOrCreateChatController(findOrCreateChatUsecase);
export const getChatController = new GetChatController(getChatUsecase);
export const getMessageController = new GetMessageController(getMessagesUsecase);
export const markMessageAsSeenController = new MarkMessageAsSeenController(messageRepository);
export const enableChatController = new EnableChatController(enableChatUsecase);

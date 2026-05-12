import { locationModel } from "../../../framework/database/models/locationModel.js";

export class LocationRepository {
  async findOrCreate(location) {
    const latitude = parseFloat(location.latitude);
    const longitude = parseFloat(location.longitude);
    const updatedLocation = await locationModel.findOneAndUpdate(
      {
        name: location.name,
        city: location.city,
        pincode: location.pincode,
        'location.coordinates': [longitude, latitude],
      },
      {
        $setOnInsert: {
          ...location,
          latitude,
          longitude,
          location: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        },
      },
      {
        new: true,  
        upsert: true,
      }
    );

    return updatedLocation
  }
}

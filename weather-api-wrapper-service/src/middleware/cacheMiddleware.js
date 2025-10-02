const WeatherModel = require('../models/weatherModel');

async function cacheMiddleware(req, res, next) {
   const location = req.params.location;

   try {
      if(!location) {
         res.status(400).json({
            message: 'please add location'
         })
         return;
      }
      const cashedData = await WeatherModel.getFromCash(location);
      if(cashedData) {
         res.status(200).json({
            fromCash: true,
            data: cashedData
         });
         return;
      }

      next();
   } catch (error) {
      console.error("Cache middleware error:", error);
      next();
   }
}

module.exports = cacheMiddleware;
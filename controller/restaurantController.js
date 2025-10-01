const restaurantModel = require("../models/restaurantModel")

exports.createRestaurant = async (req, res) => {
     try {
        const resturant = new restaurantModel(req.body);
        const saveResturant = await resturant.save();

        res.status(201).json({
            message: 'Created successfully',
            data: data
        })
     } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });  
     }
}

exports.getOne = async (req, res) => {
    try {
        const {id} = req.params.id;
        const resturant = await restaurantModel.findById(id)

        if (!resturant) {
         return res.status(404).json({
              statusCode: false,
              statusText: "Not found",  
              message: "Not found"
        });
        res.status(201).json({ 
            message: "Resturant found successfully", 
            data: user });
    };
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });  
    }
};

exports.getAll = async (req, res) => {
    try {
        const resturant = await restaurantModel.find();
    
        res.status(200).json({
            message:"Successfully get",
            data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.updateRestaurant = async (req, res) => {
    try {
        const updated = await restaurantModel.findByIdAndUpdate(req.params.id, req.body, {new: true});

        if (!updated) {
            return res.status(404).json({
                    statusCode: false,
                    statusText: "Not found",  
                    message: "Not found"     
            })
        };
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

exports.deleteRestaurant = async (req, res) => {
    try {
        const  deleted = await restaurantModel.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                statusCode: false,
                statusText: "Not found",  
                message: "Not found"
            })
        };

        
        res.status(201).json({
            message: 'Deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}

 
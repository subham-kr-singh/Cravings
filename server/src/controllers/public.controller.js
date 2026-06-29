import contact from '../models/contact.model.js';

export const contactUs = async (req, res, next) => {
    try {
        const { fullName, email, phone, subject, message } = req.body;
        if (!fullName || !email || !phone || !subject || !message) {
            const error = new Error("All field required");
            error.statusCode = 400;
            return next(error)
        }

        const newContactMessage = await contact.create({
            fullName,
            email,
            phone,
            subject,
            message,
        });

        res.status(201).json({
            message: "Thanks for contacting us",
            data: newContactMessage
        });
    } catch (error) {
        console.log(error.message)
        next(error)
    }
};
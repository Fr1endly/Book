import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        index: {
            type: Number,
            required: true
        },
        sections: [{
            index: Number,
            title: {
                type: String,
                required: true,
                unique: true
            },
            text: String
        }]
})

const Chapter = mongoose.model('chapter', chapterSchema)
export default Chapter;
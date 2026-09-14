import interviewReportModel from "../models/interviewReport.model.js";

export async function getHistory(req, res) {

    const history = await interviewReportModel.find({
        user: req.user.id
    })
        .select('jobDescription selfDescription resume matchScore createdAt')
        .sort({ createdAt: -1 })

    if (!history) {
        return res.status(200).json({
            success: true,
            message: "No History"
        })
    }




    return res.status(200).json({
        success: true,
        message: "History Fetched Successfully",
        history
    })
}

export async function getHistoryById(req, res) {
    try {
        const id = req.params.id;

        const history = await interviewReportModel.findOne({
            _id: id,
            user: req.user.id
        });

        if (!history) {
            return res.status(404).json({
                success: false,
                message: "History Not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "History Fetched Successfully",
            history
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to fetch the interview report"
        })
    }
}
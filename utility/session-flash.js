function getSessionData(req) {
    const sessionData = req.session.flashedData;

    req.session.flashedData = null; // in order to remain fresh for new data.

    return sessionData;
}

function flashDataToSession(req, data, action) {
    // req: to access to session
    // data: data to store/transport
    req.session.flashedData = data;
    // action: like save data before taking action
    req.session.save(action);
}

module.exports = {
    getSessionData: getSessionData,
    flashDataToSession: flashDataToSession
};
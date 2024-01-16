// 2023.12.26 추가

const meetsDAO = require('../models/meetsDAO');
const domain = require('../config/config.js');
const imageUploadPath = `${domain.localDomain}/images/meets/`;

exports.meetInsert = async (req, res) => {
  try {
    const meetData = req.body;
    const image = req.file ? `${imageUploadPath}${req.file.filename}` : '';

    meetData.image = image;

    const resp = await meetsDAO.insert(meetData, image);
    res.status(resp.status).json(resp);
  } catch (err) {
    console.error(err.message);

    res.status(err.status || 500).json({
      error: {
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      },
    });
  }
};

exports.meetUpdate = async (req, res) => {
  try {
    const { meet_id } = req.params;
    const meetData = req.body;
    const image = req.file ? `${imageUploadPath}${req.file.filename}` : '';

    meetData.image = image;

    console.log(meet_id);
    console.log(meetData);
    const resp = await meetsDAO.update(meet_id, meetData, image);
    res.status(resp.status).json(resp);
  } catch (err) {
    console.error(err.message);

    res.status(err.status || 500).json({
      error: {
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      },
    });
  }
};

exports.meetDelete = async (req, res) => {
  const { meet_id } = req.params;
  try {
    await meetsDAO.delete(meet_id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.meetList = async (req, res) => {
  const meet_list = req.query;
  try {
    await meetsDAO.meetList(meet_list, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.meet = async (req, res) => {
  const { meet_id } = req.params;
  try {
    await meetsDAO.meet(meet_id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.findNearbyMeetup = async (req, res) => {
  //프론트에서 현재 사용자의 위치({위도,경도})를 보내준다
  const myLocation = req.body;
  try {
    await meetsDAO.findNearbyMeetup(myLocation, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

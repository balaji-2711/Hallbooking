var express = require("express");
var router = express.Router();

var room = [];

// to get all room details
router.get("/get_room", function (req, res, next) {
  res.send(room);
});

//to create room

router.post("/create_room", (req, res) => {
  data = {
    roomId: req.body.roomId,
    capacity: req.body.capacity,
    amenities: req.body.amenities,
    price: req.body.price,
    bookedStatus: "Available",
    customerName: "",
    date: "",
    startTime: "",
    endTime: "",
  };
  room.push(data);
  console.log(room);

  res.json({
    message: "room created successfully",
    data,
  });
});

// to book room

router.post("/book_room", (req, res) => {
  let booked = false;
  room.map((e) => {
    if (e.roomId === req.body.roomId && e.bookedStatus === "Available") {
      e.customerName = req.body.customerName;

      e.date = req.body.date;
      e.startTime = req.body.startTime;
      e.endTime = req.body.endTime;

      e.bookedStatus = "Occupied";
      booked = true;
    } else {
      booked = false;
    }
  });

  if (booked) {
    res.json({
      message: "booked successfully",
    });
  } else {
    res.json({
      message: "booking failed",
    });
  }
});

// to get booked room details

router.get("/booked_room_details", (req, res) => {
  let data = [];

  room.map((e) => {
    if (e.bookedStatus === "Occupied") {
      data.push({
        roomId: e.roomId,
        customerName: e.customerName,
        bookedStatus: e.bookedStatus,
        startTime: e.startTime,
        endTime: e.endTime,
        date: e.date,
      });
    }
  });
  res.send(data);
});

// to get booked customer details

router.get("/booked_customer_details", (req, res) => {
  let data = [];

  room.map((e) => {
    if (e.bookedStatus === "Occupied") {
      data.push({
        customerName: e.customerName,
        roomId: e.roomId,
        startTime: e.startTime,
        endTime: e.endTime,
        date: e.date,
      });
    }
  });
  res.send(data);
});

module.exports = router;

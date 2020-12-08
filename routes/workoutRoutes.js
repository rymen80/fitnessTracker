const router = require("express").Router();
const Workout = require("../config/models/workoutSchema");

// getLastWorkout route
router.get("/api/workouts", (_req, res) => {
    Workout.find()
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// getWorkoutsInRange route
router.get("/api/workouts/range", (_req, res) => {
    Workout.find()
        .limit(7)
        .then((dbWorkouts) => {
            res.json(dbWorkouts);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// addExercise route
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    )
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        });
});

// createWorkout route
router.post("/api/workouts", ({ body }, res) => {
    Workout.create({
        // day: new Date().setDate(new Date().getDate() - 10),
        // exercises: [body],
    })
        .then((dbWorkout) => {
            res.json(dbWorkout);
            console.log(`Workout created: ${body}`);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// deleteWorkout route
router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
        .then(() => {
            res.json(true);
        })
        .catch((err) => {
            res.json(err);
        });
});

module.exports = router;

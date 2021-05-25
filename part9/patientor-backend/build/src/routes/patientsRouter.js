"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getEntries());
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = utils_1.toNewPatientEntry(req.body);
        const addedEntry = patientService_1.default.addPatient(newPatientEntry);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.get('/:id', (req, res) => {
    try {
        const patient = patientService_1.default.getPatient(req.params.id);
        res.json(patient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;

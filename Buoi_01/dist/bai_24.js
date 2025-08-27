"use strict";
// 24. Create an abstract class Appliance with method turnOn(). Implement Fan and AirConditioner.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirConditioner = exports.Fan = exports.Appliance = void 0;
class Appliance {
}
exports.Appliance = Appliance;
class Fan extends Appliance {
    turnOn() {
        console.log("Quạt đã được bật.");
    }
}
exports.Fan = Fan;
class AirConditioner extends Appliance {
    turnOn() {
        console.log("Máy lạnh đã được bật.");
    }
}
exports.AirConditioner = AirConditioner;

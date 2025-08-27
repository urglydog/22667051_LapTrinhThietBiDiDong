// 24. Create an abstract class Appliance with method turnOn(). Implement Fan and AirConditioner.

export abstract class Appliance {
  abstract turnOn(): void;
}

export class Fan extends Appliance {
  turnOn(): void {
    console.log("Quạt đã được bật.");
  }
}

export class AirConditioner extends Appliance {
  turnOn(): void {
    console.log("Máy lạnh đã được bật.");
  }
}

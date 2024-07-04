const log = console.log;

let apt = {
  floor: 12,
  number: "12B",
  size: 3400,
  bedRooms: 3.4,
  bathRooms: 2,
  Price: 400000,
  amenities: {
    airCon: 4,
  },
};

const descriptor = Object.getOwnPropertyDescriptor(apt, "floor");

Object.defineProperty(apt, "floor", { writable: false, configurable: false });

// This line would cause a TS error (run `npm run ts` to test) because we defined the "floor" property as not writable
// apt.floor = 33;

log(descriptor);
log(apt.floor);

class MyAppat {
  private apt;
  constructor(apt: any) {
    this.apt = apt;
  }

  getFloor() {
    return this.apt.floor;
  }
}

// With this line we are preventing anyone from overriding the "getFloor method"
Object.defineProperty(MyAppat.prototype, "getFloor", { writable: false });

const appat1 = new MyAppat(apt);

// This line would show a TS error because we defined the "getFloor" property as not writable: `TypeError: Cannot assign to read only property 'getFloor' of object '#<MyAppat>'`
// appat1.getFloor = () => "Overrided getFloor method";

log(appat1.getFloor());

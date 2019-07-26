/* hide-range{1-3} */
import tv from "./tv";
tv;

describe("a tv recorder", () => {
  it(`will record a tv program when pressing on the "record" button if : 
      - there is enough space on device.
      - there is at least one free tuner available on the set-top-box`, () => {});
  it(`will not record a tv program when pressing on the "record" button 
      - if there is not enough space on the hard disk.
      - then the error message "no space left on hard disk" will be shown.`, () => {});
});

import { TestBed } from "@angular/core/testing";

import { ConstantServiceWrapper } from "./ConstantServiceWrapper.service";

describe("ConstantServiceWrapper", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ConstantServiceWrapper = TestBed.get(ConstantServiceWrapper);
    expect(service).toBeTruthy();
  });
});

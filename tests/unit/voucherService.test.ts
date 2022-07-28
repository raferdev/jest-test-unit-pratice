import voucherRepository from "../../src/repositories/voucherRepository.js";
import * as Services from "../../src/services/voucherService.js";
import { jest } from "@jest/globals";

describe("voucherService test suite", () => {
  //CREATE

  it("should throw error with existing voucher", async () => {
    jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce({
      id: 1,
      code: "123",
      discount: 10,
      used: true,
    });
    try {
      await Services.default.createVoucher("123", 10);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it("should execute create repository voucher", async () => {
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockResolvedValueOnce(null);

    jest.spyOn(voucherRepository, "createVoucher").mockResolvedValueOnce({
      id: 1,
      code: "123",
      discount: 10,
      used: true,
    });

    try {
      await Services.default.createVoucher("123", 10);
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });

  //APPLY

  it("should throw error with no existing voucher", async () => {
    jest
      .spyOn(voucherRepository, "getVoucherByCode")
      .mockResolvedValueOnce(null);
    try {
      await Services.default.applyVoucher("123", 10);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it("should aplly voucher", async () => {
    jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce({
      id: 1,
      code: "123",
      discount: 10,
      used: true,
    });

    try {
     const result =  await Services.default.applyVoucher("123", 1000);
      const {finalAmount} = result
      expect(finalAmount).toEqual(1000)

    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });

  it("should throw error with existing voucher", async () => {
    jest.spyOn(voucherRepository, "getVoucherByCode").mockResolvedValueOnce({
      id: 1,
      code: "123",
      discount: 10,
      used: false,
    });
    jest.spyOn(voucherRepository, "useVoucher").mockResolvedValueOnce({
      id: 1,
      code: "123",
      discount: 10,
      used: false,
    });

    try {
      const result = await Services.default.applyVoucher("123", 1000);
      const {finalAmount} = result;
      expect(finalAmount).toEqual(900);

    } catch (e) {
      console.log(e)
      expect(e).toBeUndefined();
    }

  });
});

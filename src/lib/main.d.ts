type SendOTPToInput = {
  to: string;
};

type VerifyOTPFromInput = {
  from: string;
  code: string;
};

export function sendOTPTo(input: SendOTPToInput): Promise<number>;

export function verifyOTPFrom(input: VerifyOTPFromInput): Promise<boolean>;

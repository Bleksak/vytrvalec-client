enum PasswordStrength {
    STRENGTH_VERY_WEAK,
    STRENGTH_WEAK,
    STRENGTH_MEDIUM,
    STRENGTH_STRONG,
    STRENGTH_VERY_STRONG
}

export class PasswordEstimator {
    public static estimateStrength(password: string | undefined): number {
        if (!password || !password.length) {
            return PasswordStrength.STRENGTH_VERY_WEAK;
        }

        let passwordChars = new Map<number, number>();
        for (let char of password) {
            let charCode = char.charCodeAt(0);
            passwordChars.set(charCode, (passwordChars.get(charCode) || 0) + 1);
        }

        let control = 0, digit = 0, upper = 0, lower = 0, symbol = 0, other = 0;
        for (let [char] of passwordChars) {
            switch (true) {
                case char < 32 || char === 127:
                    control = 33;
                    break;
                case char >= 48 && char <= 57:
                    digit = 10;
                    break;
                case char >= 65 && char <= 90:
                    upper = 26;
                    break;
                case char >= 97 && char <= 122:
                    lower = 26;
                    break;
                case char >= 128:
                    other = 128;
                    break;
                default:
                    symbol = 33;
            }
        }

        let pool = lower + upper + digit + symbol + control + other;
        let entropy = passwordChars.size * Math.log2(pool) + (password.length - passwordChars.size) * Math.log2(passwordChars.size);

        switch (true) {
            case entropy >= 120:
                return PasswordStrength.STRENGTH_VERY_STRONG;
            case entropy >= 100:
                return PasswordStrength.STRENGTH_STRONG;
            case entropy >= 80:
                return PasswordStrength.STRENGTH_MEDIUM;
            case entropy >= 60:
                return PasswordStrength.STRENGTH_WEAK;
            default:
                return PasswordStrength.STRENGTH_VERY_WEAK;
        }
    }
}
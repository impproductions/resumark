type NonPrimitive<T> = T extends string | number | boolean | null | undefined
    ? never
    : T;

export class Validator<T> {
    constructor(
        public object: NonPrimitive<T>,
        public rules: [((obj: NonPrimitive<T>) => boolean), string][],
    ) {}

    public validate(): [boolean, string[]] {
        let valid = true;
        const errors: string[] = [];

        for (const [rule, msg] of this.rules) {
            const result = rule(this.object);
            if (!result) {
                valid = false;
                errors.push(msg);
            }
        }

        return [valid, errors];
    }

    public valid(): boolean {
        return this.validate()[0];
    }
}

export type Result<T> = {
    valid: true;
    value: T;
} | {
    valid: false;
    errors: string[];
};

export function Ok<T>(value: T): Result<T> {
    return { valid: true, value };
}

export function Err<T>(errors: string[]): Result<T> {
    return { valid: false, errors };
}
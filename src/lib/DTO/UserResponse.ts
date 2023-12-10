import type { Faculty } from "./Faculty";
import type { UserRole } from "./UserRole";

export type UserResponse = {
    id: number;
    email: string;
    roles: UserRole[];
    faculty: Faculty;
};

import { IGoal } from "./goal.interface";

export interface IHeroProfileDto {
    id: string,
    username: string,
    goal: IGoal
}
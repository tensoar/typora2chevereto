import { ArrayMinSize, IsNotEmpty, Matches } from 'class-validator';
import RegularExp from './regular-exp';

export class EnvArgs {
    @IsNotEmpty()
    baseUrl: string;

    @Matches(RegularExp.str)
    key: string;

    @ArrayMinSize(1)
    imagePaths: string[];
}
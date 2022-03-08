import { SetMetadata } from '@nestjs/common';

export const ALLOWANON_KEY = 'AllowAnon';
export const AllowAnon = () => SetMetadata(ALLOWANON_KEY, true);
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, Logger } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { Role, Roles } from '../roles';
import { CreateDto, FindAllFilterDto, PatchDto } from './dto';

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private usersService: UsersService) {}

    @Post()
    @Roles(Role.Admin)
    async createUser(@Body() createDto: CreateDto) {
        await this.usersService.createUser(createDto);
    }

    @Get('me')
    async getCurrentUser(@Request() req): Promise<User | null> {
        if(!req.user || !req.user.id) return null;
        return this.usersService.findUserById(req.user.id);
    }
    @Get()
    @Roles(Role.Admin)
    async getUsersByFilter(@Query() query: FindAllFilterDto): Promise<User[]> {
        return await this.usersService.findUsers(query);
    }
    @Get(':id')
    @Roles(Role.Admin)
    async getUserById(@Param('id') id: string): Promise<User | null> {
        return await this.usersService.findUserById(id);
    }

    // Generally you'd allow the user to delete themselves here
    // However for the sake of time with the project we will ignore it for now
    @Patch(':id')
    @Roles(Role.Admin)
    async patchUser(@Param('id') id: string, @Body() patchData: PatchDto) {
        await this.usersService.patchUser(id, patchData);
    }

    // Just like with patchUser, you'd generally allow the user to remove their account
    // But once again to not take up too much time right now, I didn't implement it
    @Delete(':id')
    @Roles(Role.Admin)
    async removeUser(@Param('id') id: string) {
        await this.usersService.removeUser(id);
    }
}

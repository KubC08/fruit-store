import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { FindAllFilterDto, PatchDto } from './dto';
import { Role } from 'src/roles/role.enum';

@Injectable()
export class UsersService implements OnModuleInit {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private configService: ConfigService
    ) {}

    async onModuleInit() {
        const userConfig = this.configService.get('defaultUser');
        const defaultUser = await this.findByUsernameInternal(userConfig.username);
        if(defaultUser) return;

        await this.createUserInternal({
            username: userConfig.username,
            email: userConfig.username,
            password: userConfig.password,
            roles: [ Role.Admin ]
        });
        this.logger.log('Created default admin user!');
    }

    // NOTE: These are internal functions and should not be exposed to the public!
    async findByUsernameInternal(username: string): Promise<User | null> {
        return await this.userModel.findOne({ username: username }).exec();
    }
    async createUserInternal(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        createdUser.password = hash;

        this.logger.log('Added new user ' + createdUser.username);
        return await createdUser.save();
    }

    async createUser(user: User): Promise<User> {
        const { password, ...newUser } = await this.createUserInternal(user);

        return newUser;
    }

    async findUserById(id: string): Promise<User | null> {
        return await this.userModel.findById(id, { __v: 0, password: 0 });
    }
    async findUser(usernameOrEmail: string): Promise<User | null> {
        return await this.userModel.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        }, { __v: 0, password: 0 });
    }
    async findUsers(filter: FindAllFilterDto): Promise<User[]> {
        const mongoFilter: FilterQuery<UserDocument> = {};

        if(!filter.page || isNaN(filter.page))
            filter.page = 0;
        else filter.page = Number(filter.page); // Just in case we get a string

        if(!filter.itemsPerPage || isNaN(filter.itemsPerPage))
            filter.itemsPerPage = 10;
        else filter.itemsPerPage = Number(filter.itemsPerPage); // Once again, just in case

        if(filter.username)
            mongoFilter['$text'] = { $search: filter.username, $caseSensitive: false };
        if(filter.roles)
            mongoFilter['roles'] = { $all: filter.roles };

        return await this.userModel.find(mongoFilter, { __v: 0, password: 0 })
                        .skip(filter.page > 0 ? ((filter.page - 1) * filter.itemsPerPage): 0)
                        .limit(filter.itemsPerPage)
                        .exec();
    }

    async patchUser(id: string, patchDto: PatchDto): Promise<User | null> {
        if(patchDto.password) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(patchDto.password, salt);

            patchDto.password = hash;
        }

        return await this.userModel.findByIdAndUpdate(id,
            { $set: patchDto },
            {
                projection: { __v: 0, password: 0 }
            }
        ).exec();
    }

    async removeUser(id: string): Promise<User | null> {
        return await this.userModel.findByIdAndRemove(id, {
            projection: { __v: 0, password: 0 }
        }).exec();
    }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { FindAllFilterDto, CreateDto, PatchDto } from './dto';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemsService {
    private readonly logger = new Logger(ItemsService.name);

    constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

    async create(createDto: CreateDto): Promise<Item> {
        const createdItem = new this.itemModel(createDto);
        
        return await createdItem.save();
    }
    async findAll(filter: FindAllFilterDto): Promise<Item[]> {
        const mongoFilter: FilterQuery<ItemDocument> = {};

        if(!filter.page || isNaN(filter.page))
            filter.page = 0;
        else filter.page = Number(filter.page); // Just in case we get a string

        if(!filter.itemsPerPage || isNaN(filter.itemsPerPage))
            filter.itemsPerPage = 10;
        else filter.itemsPerPage = Number(filter.itemsPerPage); // Once again, just in case

        if(filter.available != undefined) {
            if(filter.available === 'true') mongoFilter['availableCount'] = { $gt: 0 };
            else mongoFilter['availableCount'] = 0;
        }
        if(filter.name)
            mongoFilter['$text'] = { $search: filter.name, $caseSensitive: false };
        if(filter.tags)
            mongoFilter['tags'] = { $all: filter.tags };

        return await this.itemModel.find(mongoFilter, { __v: 0 })
                        .skip(filter.page > 0 ? ((filter.page - 1) * filter.itemsPerPage) : 0)
                        .limit(filter.itemsPerPage)
                        .exec();
    }
    async findById(id: string): Promise<Item | null> {
        return await this.itemModel.findById(id, { __v: 0 }).exec();
    }
    async patch(id: string, patchDto: PatchDto): Promise<Item | null> {
        return await this.itemModel.findByIdAndUpdate(id,
            { $set: patchDto },
            {
                projection: { __v: 0 }
            }
        ).exec();
    }
    async remove(id: string): Promise<Item | null> {
        return await this.itemModel.findByIdAndDelete(id, {
            projection: { __v: 0 }
        }).exec();
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Order, OrderDocument } from './schemas/order.schema';
import { CreateDto, FindAllFilterDto, PatchDto } from './dto';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

    // Eventually you'd make it auto-decrement the available amount of items
    async create(createDto: CreateDto): Promise<Order> {
        const createdOrder = new this.orderModel(createDto);
        return await createdOrder.save();
    }

    async findById(id: string): Promise<Order | null> {
        return await this.orderModel.findById(id, { __v: 0 }).exec();
    }
    async findByFilter(filter: FindAllFilterDto): Promise<Order[]> {
        const mongoFilter: FilterQuery<OrderDocument> = {};

        if(!filter.page || isNaN(filter.page))
            filter.page = 0;
        else filter.page = Number(filter.page); // Just in case we get a string

        if(!filter.itemsPerPage || isNaN(filter.itemsPerPage))
            filter.itemsPerPage = 10;
        else filter.itemsPerPage = Number(filter.itemsPerPage); // Once again, just in case

        if(filter.paymentType)
            mongoFilter['paymentType'] = filter.paymentType;
        if(filter.shippingType)
            mongoFilter['shippingType'] = filter.shippingType;
        if(filter.deliveryCountry)
            mongoFilter['deliveryCountry'] = filter.deliveryCountry;

        return await this.orderModel.find(mongoFilter, { __v: 0 })
                        .skip(filter.page > 0 ? ((filter.page - 1) * filter.itemsPerPage) : 0)
                        .limit(filter.itemsPerPage)
                        .exec();
    }

    async patch(id: string, patchDto: PatchDto): Promise<Order | null> {
        return await this.orderModel.findByIdAndUpdate(id, 
            { $set: patchDto },
            { projection: { __v: 0 } }
        ).exec();
    }

    async remove(id: string): Promise<Order | null> {
        return await this.orderModel.findByIdAndRemove(id, {
            projection: { __v: 0 }
        }).exec();
    }
}

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateDto, FindAllFilterDto, PatchDto } from './dto';
import { Order } from './schemas/order.schema';
import { AllowAnon } from 'src/auth/allowAnon.decorator';
import { Role, Roles } from '../roles';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post()
    @AllowAnon()
    async createOrder(@Body() createDto: CreateDto) {
        await this.ordersService.create(createDto);
    }

    @Get(':id')
    @AllowAnon() // To allow users who have ordered to view them
    async getOrderById(@Param('id') id: string): Promise<Order | null> {
        return await this.ordersService.findById(id);
    }
    @Get()
    @Roles(Role.Admin)
    async getOrdersByFilter(@Query() query: FindAllFilterDto): Promise<Order[]> {
        return await this.ordersService.findByFilter(query);
    }

    @Patch(':id')
    @Roles(Role.Admin)
    async patchOrder(@Param('id') id: string, @Body() patchData: PatchDto) {
        await this.ordersService.patch(id, patchData);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    async removeOrder(@Param('id') id: string) {
        await this.ordersService.remove(id);
    }
}

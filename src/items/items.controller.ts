import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { Item } from './schemas/item.schema'
import { ItemsService } from './items.service';
import { CreateDto, FindAllFilterDto, PatchDto } from './dto';
import { Role, Roles } from '../roles';
import { AllowAnon } from 'src/auth/allowAnon.decorator';

@Controller('items')
export class ItemsController {
    constructor(private itemsService: ItemsService) {}

    @Post()
    @Roles(Role.Admin)
    async createItem(@Body() createDto: CreateDto) {
        await this.itemsService.create(createDto);
    }

    @AllowAnon()
    @Get(':id')
    async getItemById(@Param('id') id: string): Promise<Item | null> {
        return await this.itemsService.findById(id);
    }
    @AllowAnon()
    @Get()
    async getItemsByFilter(@Query() query: FindAllFilterDto): Promise<Item[]> {
        return await this.itemsService.findAll(query);
    }

    @Patch(':id')
    @Roles(Role.Admin)
    async patchItem(@Param('id') id: string, @Body() patchData: PatchDto) {
        await this.itemsService.patch(id, patchData);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    async removeItem(@Param('id') id: string) {
        await this.itemsService.remove(id);
    }
}

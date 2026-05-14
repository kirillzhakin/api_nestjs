import { Controller, Get } from '@nestjs/common';
import { ServerService } from './settings.service';

@Controller('settings')
export class ServerController {
    constructor(private service: ServerService) { }

    @Get('generalSettings')
    getGeneralSettings() {
        return this.service.getGeneralSettingsFromDB();
    }
}
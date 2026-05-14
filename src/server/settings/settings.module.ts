import { Module } from '@nestjs/common';
import { ServerController } from './settings.controller';
import { ServerService } from './settings.service';
import { DbModule } from '@/database';

@Module({
  imports: [DbModule],
  controllers: [ServerController],
  providers: [ServerService],
  exports: [ServerService],
})
export class SettingsModule {}
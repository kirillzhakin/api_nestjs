import { Module } from '@nestjs/common';
import { SettingsModule } from './settings';

@Module({
  imports: [SettingsModule],

})
export class ServerModule {}
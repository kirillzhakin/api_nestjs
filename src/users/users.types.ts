/**
 * Идентификаторы доступа к категориям данных
 */
export enum ELogType {
  /** Клавиатура */
  Keyboard = 1,
  /** Скриншоты */
  Screenshots = 2,
  /** Программы */
  Programs = 3,
  /** Файлы */
  Files = 4,
  /** Буфер обмена */
  Clipboard = 5,
  /** Принтер */
  Printer = 6,
  /** Установленные программы */
  InstalledPrograms = 7,
  /** Внешние накопители */
  ExternalDrives = 8,
  /** Посещенные сайты */
  VisitedSites = 10,
  /** Компьютер (события вкл-выкл) */
  Computer = 11,
  /** Теневое копирование */
  ShadowCopying = 14,
  /** Почта (почтовые клиенты) */
  EMailClients = 15,
  /** Сеть доступ */
  NetworkAccess = 18,
  /** Сеть файлы */
  NetworkFiles = 19,
  /** Веб почта (через браузер) */
  WebMail = 20,
  /** Выгрузка файлов */
  FileUpload = 21,
  /** Социальные сети */
  SocialNetworks = 22,
  /** Мессенджеры */
  Messengers = 23,
  /** WebCam/Microphone */
  WebcamAndMicrophone = 24,
  /** Изменения оборудования */
  HardwareChanges = 25,
  /** Поисковые запросы */
  SearchQueries = 26,
  /** Записи с микрофона */
  MicRecords = 27,
}

/**
 * Роли пользователя
 */
export enum EUserRole {
  /**
   * Отключен
   */
  Disabled = 0,
  /**
   * Администратор
   */
  Admin = 1,
  /**
   * Пользователь. Только чтение
   */
  UserViewer = 2,
  /**
   * Пользователь. Чтение и удаление
   */
  UserEditor = 3,
  /**
   * Пользователь с правами администратора
   */
  UserAdmin = 4,
}

interface IUser {
  id: number;
  role: EUserRole;
  allowedTypes?: ELogType[];
  tgCodeNeeded?: boolean
}

export interface IUserTokens extends IUser {
  access_token?: string;
  access_token_expires_in?: Date;
  refresh_token?: string;
  refresh_token_expires_in?: Date;
}

export interface IControlLoginOutputRow {
  /**
   * Идентификатор
   */
  OID: number;

  /**
   * Статус
   */
  OSTAT: EUserRole;
}
export default class ChatError extends Error {

  constructor(
    message: string,
    meta?: Record<string, any>,
  ) {
    super();
    this.name = 'ChatError';
    this.message = message;
    if (meta) {
      this.extraData = meta;
    }
  }

  extraData: Record<string, any> | undefined;

}

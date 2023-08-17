export const encrypt = (data: string) => Buffer.from(data).toString('base64');
export const decrypt = (data: string) => Buffer.from(data, 'base64').toString('ascii');

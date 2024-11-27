import mongoose from 'mongoose';

class DataBaseConfig {


    public async connect(): Promise<mongoose.Connection> {
        await mongoose.connect(process.env.MONGO_URL as string, {});

        const connection = mongoose.connection;

        connection.once('open', () => {
            console.log('Database connected successfully');
        });
        connection.on('error', () => {
            console.log('Error while connecting to the database');
        });

        return connection;
    }
}

const dataBaseConfig = new DataBaseConfig();
export default dataBaseConfig;
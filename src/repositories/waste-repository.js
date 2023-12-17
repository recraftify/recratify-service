const StandardError = require('../utils/standard-error');
const { getDB } = require('../clients/google-firestore-admin');

class WasteRepository {
    static async getAllWaste() {
        try {
            const DB = await getDB();
            const wasteSnapshot = await DB.collection('waste').get();
            if (!wasteSnapshot.empty) {
                const wasteData = wasteSnapshot.docs.map((doc) => doc.data());
                return wasteData;
            }
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
            );
        }
    }
    static async getWasteById(id) {
        try {
            const DB = await getDB();
            const wasteSnapshot = await DB.collection('waste').doc(id).get();
            if (wasteSnapshot.exists) {
                return wasteSnapshot.data();
            }
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
                {
                    id,
                },
            );
        }
    }

    static async getWasteByType(type) {
        try {
            const DB = await getDB();
            const wasteSnapshot = await DB.collection('waste')
                .where('type', '==', type)
                .get();
            if (!wasteSnapshot.empty) {
                const wasteData = wasteSnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        name: doc.data().name,
                        image: doc.data().image,
                    };
                });
                return wasteData;
            }
        } catch (error) {
            throw new StandardError(
                500,
                'DATABASE_ERROR',
                'Error occured in database',
                error,
                {
                    type,
                },
            );
        }
    }
}
module.exports = WasteRepository;

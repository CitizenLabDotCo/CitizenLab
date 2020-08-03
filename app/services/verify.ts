import { API_PATH } from 'containers/App/constants';
import streams from 'utils/streams';

export interface IVerifiedResponse {
  verification: {
    run: string;
    id_serial: string;
  };
}

export function verifyCOW(run: string, id_serial: string) {
  return streams.add<IVerifiedResponse>(
    `${API_PATH}/verification_methods/cow/verification`,
    {
      verification: {
        run,
        id_serial,
      },
    }
  );
}

export function verifyBogus(desired_error: string) {
  return streams.add<IVerifiedResponse>(
    `${API_PATH}/verification_methods/bogus/verification`,
    {
      verification: {
        desired_error,
      },
    }
  );
}

export function verifyIDLookup(idCard: string) {
  return streams.add<IVerifiedResponse>(
    `${API_PATH}/verification_methods/id_card_lookup/verification`,
    {
      verification: {
        card_id: idCard,
      },
    }
  );
}

import { useState, useEffect } from 'react';
import {
  getInitiativeActionDescriptors,
  IInitiativeAction,
} from 'services/initiatives';
import { isNilOrError } from 'utils/helperUtils';
import { ActionPermission } from 'services/actionTakingRules';
import { currentTenantStream } from 'services/tenant';
import { authUserStream } from 'services/auth';
import { combineLatest } from 'rxjs';

export type IInitiativeDisabledReason = 'notPermitted';

export type IPreliminaryAction =
  | 'sign_in_up'
  | 'verify'
  | 'sign_in_up_and_verify';

export default function useInitiativesPermissions(action: IInitiativeAction) {
  const [actionPermission, setActionPermission] = useState<
    ActionPermission | null | undefined
  >(undefined);

  useEffect(() => {
    const subscription = combineLatest(
      getInitiativeActionDescriptors().observable,
      currentTenantStream().observable,
      authUserStream().observable
    ).subscribe(([actionDescriptors, tenant, authUser]) => {
      if (!isNilOrError(tenant) && !isNilOrError(actionDescriptors)) {
        const actionDescriptor = actionDescriptors[action];

        if (!tenant.data.attributes.settings.initiatives?.posting_enabled) {
          setActionPermission({
            show: false,
            enabled: null,
            disabledReason: null,
            action: null,
          });
        } else if (actionDescriptor.enabled) {
          setActionPermission({
            show: true,
            enabled: true,
            disabledReason: null,
            action: null,
          });
        } else {
          switch (actionDescriptor.disabled_reason) {
            case 'not_verified':
              if (isNilOrError(authUser)) {
                setActionPermission({
                  show: true,
                  enabled: 'maybe',
                  disabledReason: null,
                  action: 'sign_in_up_and_verify',
                });
              } else {
                setActionPermission({
                  show: true,
                  enabled: 'maybe',
                  disabledReason: null,
                  action: 'verify',
                });
              }
            case 'not_signed_in':
              setActionPermission({
                show: true,
                enabled: 'maybe',
                disabledReason: null,
                action: 'sign_in_up',
              });
            default:
              setActionPermission({
                show: true,
                enabled: false,
                disabledReason: 'notPermitted',
                action: null,
              });
          }
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return actionPermission as ActionPermission;
}

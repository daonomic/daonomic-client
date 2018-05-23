// @flow
import { observer, inject } from 'mobx-react';
import KycView from './view';

import type { KycStore } from '~/stores/kyc';
import type { SaleStore } from '~/stores/sale';
import type { Props } from './view';

const ObservingKycView = observer(KycView);

export default inject(
  ({ kyc, sale }: { kyc: KycStore, sale: SaleStore }): Props => ({
    tokenSymbol: sale.state.tokenSymbol,
    isKycExtended: kyc.isExtended,
    kycForm: kyc.form,
    isSaving: kyc.isSaving,
    isSaved: kyc.isSaved,
    isAllowed: kyc.isAllowed,
    isDenied: kyc.isDenied,
    isOnReview: kyc.isOnReview,
    isEditingAllowed: !kyc.isSaving && !kyc.isOnReview && !kyc.isAllowed,
    denialReason: kyc.state.denialReason,
    getFileUrlById: kyc.getFileUrlById,
    uploadFiles: kyc.uploadFiles,
    onChangeKycFormField: kyc.updateFormField,
    onSave: kyc.saveData,
  }),
)(ObservingKycView);

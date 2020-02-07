// // Be careful when using this component, you have to use onChangeMultiloc and not onChange
// // onChange will override the behaviour of this components and without any error from TS not work as intended

// import React, { PureComponent } from 'react';
// import { get } from 'lodash-es';

// // components
// import QuillEditor, { Props as VanillaProps } from 'components/UI/QuillEditor';
// import Label from 'components/UI/Label';

// // style
// import styled from 'styled-components';

// // typings
// import { Locale, Multiloc } from 'typings';

// // resources
// import GetTenantLocales, { GetTenantLocalesChildProps } from 'resources/GetTenantLocales';

// // utils
// import { isNilOrError } from 'utils/helperUtils';

// const Container = styled.div``;

// const EditorWrapper = styled.div`
//   &:not(.last) {
//     margin-bottom: 16px;
//   }
// `;

// const LanguageExtension = styled.span`
//   font-weight: 500;
//   display: inline-block;
// `;

// export type InputProps = {
//   id: string;
//   valueMultiloc?: Multiloc | null;
//   label?: string | JSX.Element | null;
//   labelTooltip?: JSX.Element;
//   onChangeMultiloc?: (value: Multiloc) => void;
//   renderPerLocale?: (locale: string) => JSX.Element;
//   selectedLocale?: Locale;
// };

// type DataProps = {
//   tenantLocales: GetTenantLocalesChildProps;
// };

// interface Props extends InputProps, DataProps { }

// export interface MultilocEditorProps extends InputProps, VanillaProps {}

// interface State { }

// class EditorMultiloc extends PureComponent<Props & VanillaProps, State> {
//   handleOnChange = (locale: Locale) => (html: string) => {
//     if (this.props.onChangeMultiloc) {
//       const multiloc = Object.assign({}, this.props.valueMultiloc || {});
//       multiloc[locale] = html;
//       this.props.onChangeMultiloc(multiloc);
//     }
//   }

//   renderOnce = (locale, index) => {
//     const { tenantLocales, label, labelTooltip, renderPerLocale, id, valueMultiloc, labelId, ...otherProps } = this.props;
//     const value = get(valueMultiloc, [locale], undefined);
//     const idLocale = id && `${id}-${locale}`;
//     const idLabelLocale = id && `label-${id}-${locale}`;

//     if (isNilOrError(tenantLocales)) return null;

//     return (
//       <EditorWrapper key={locale} className={`${index === tenantLocales.length - 1 && 'last'}`}>
//         {label &&
//           <Label id={idLabelLocale}>
//             {label}
//             {tenantLocales.length > 1 && <LanguageExtension>{locale.toUpperCase()}</LanguageExtension>}
//             {labelTooltip}
//           </Label>
//         }

//         {renderPerLocale && renderPerLocale(locale)}

//         <QuillEditor
//           id={idLocale}
//           value={value || ''}
//           onChange={this.handleOnChange(locale)}
//           {...otherProps}
//           labelId={label ? idLabelLocale : labelId}
//         />
//       </EditorWrapper>
//     );
//   }

//   render() {
//     const { tenantLocales, id, selectedLocale } = this.props;

//     if (!isNilOrError(tenantLocales)) {
//       return (
//         <Container id={id} className={`${this.props['className']} e2e-multiloc-editor`} >
//           {!selectedLocale ? tenantLocales.map((currentTenantLocale, index) => this.renderOnce(currentTenantLocale, index))
//         : this.renderOnce(selectedLocale, 0)}
//         </Container>
//       );
//     }

//     return null;
//   }
// }

// export default (props: InputProps & VanillaProps) => (
//   <GetTenantLocales>
//     {tenantLocales => <EditorMultiloc {...props} tenantLocales={tenantLocales} />}
//   </GetTenantLocales>
// );

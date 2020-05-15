// // Libraries
// import React, { memo, useCallback } from 'react';
// import { get } from 'lodash-es';
// import { first } from 'rxjs/operators';
// import { isNilOrError } from 'utils/helperUtils';

// // Services
// import { findMembership, addMembership } from 'services/moderators';
// import { IGroupMembershipsFoundUserData } from 'services/groupMemberships';

// // Resources
// import { GetModeratorsChildProps } from 'resources/GetModerators';

// // Hooks
// import useTopics from 'hooks/useTopics';

// // i18n
// import { InjectedIntlProps } from 'react-intl';
// import { injectIntl } from 'utils/cl-intl';
// import messages from './messages';

// // Components
// import Button from 'components/UI/Button';
// import AsyncSelect from 'react-select/async';
// import MultipleSelect from 'components/UI/MultipleSelect';

// // Style
// import styled from 'styled-components';
// import selectStyles from 'components/UI/MultipleSelect/styles';

// // Typings
// import { IOption } from 'typings';

// const Container = styled.div`
//   width: 100%;
//   margin-bottom: 20px;
// `;

// const SelectGroupsContainer = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   align-items: center;
//   margin-bottom: 30px;
// `;

// const StyledAsyncSelect = styled(AsyncSelect)`
//   min-width: 300px;
// `;

// const AddTopicButton = styled(Button)`
//   flex-grow: 0;
//   flex-shrink: 0;
//   margin-left: 30px;
// `;

// interface Props {}

// interface State {
//   selection: IOption[];
//   loading: boolean;
//   processing: boolean;
// }

// function isModerator(user: IGroupMembershipsFoundUserData) {
//   return get(user.attributes, 'is_moderator') !== undefined;
// }

// const MembersAdd = memo(() => {
//   const topics = useTopics();

//   const handleTopicSelectionChange = useCallback(() => {

//   }, []);

//   const getOptions = () => {

//   };

//   if (!isNilOrError(topics)) {

//     return (
//       <Container>
//         <SelectGroupsContainer>
//           <MultipleSelect
//             value={selectedTopics}
//             options={}
//             onChange={handleTopicSelectionChange}
//           />

//           <AddTopicButton
//             text={formatMessage(messages.addTopics)}
//             buttonStyle="cl-blue"
//             icon="plus-circle"
//             onClick={this.handleOnAddModeratorsClick}
//             disabled={!selection || selection.length === 0}
//             processing={this.state.processing}
//           />
//         </SelectGroupsContainer>
//       </Container>
//     );
//   }

//   return null;
// });

// extends PureComponent<Props & InjectedIntlProps, State> {
//   constructor(props: Props & InjectedIntlProps) {
//     super(props);
//     this.state = {
//       selection: [],
//       loading: false,
//       processing: false
//     };
//   }

//   getOptions = (users: IGroupMembershipsFoundUserData[]) => {
//     return users
//       .filter((user) => {
//         let userIsNotYetModerator = true;
//         const { moderators } = this.props;

//         if (!isNilOrError(moderators)) {
//           moderators.forEach((moderator) => {
//             if (moderator.id === user.id) {
//               userIsNotYetModerator = false;
//             }
//           });
//         }

//         return userIsNotYetModerator;
//       })
//       .map((user) => {
//         return {
//           value: user.id,
//           label: `${user.attributes.first_name} ${user.attributes.last_name}`,
//           email: `${user.attributes.email}`,
//           disabled: isModerator(user) ? get(user.attributes, 'is_moderator') : get(user.attributes, 'is_member'),
//         };
//       });
//   }

//   loadOptions = (inputValue: string, callback) => {
//     if (inputValue) {
//       this.setState({ loading: true });

//       findMembership(this.props.projectId, {
//         queryParameters: {
//           search: inputValue
//         }
//       }).observable.pipe(
//         first()
//       ).subscribe((response) => {
//         const options = this.getOptions(response.data);
//         this.setState({ loading: false });
//         callback(options);
//       });
//     }
//   }

//   handleOnChange = async (selection: IOption[]) => {
//     this.setState({ selection });
//   }

//   handleOnAddModeratorsClick = async () => {
//     const { selection } = this.state;

//     if (selection && selection.length > 0) {
//       this.setState({ processing: true });
//       const promises = selection.map(item => addMembership(this.props.projectId, item.value));

//       try {
//         await Promise.all(promises);
//         this.setState({ selection: [], processing: false });
//       } catch {
//         this.setState({ selection: [], processing: false });
//       }
//     }
//   }

//   // noOptionsMessage = () => {
//   //   return this.props.intl.formatMessage(messages.noOptions);
//   // }

//   render() {
//     const { selection } = this.state;
//     const { formatMessage } = this.props.intl;


//   }
// }

// export default injectIntl<Props>(MembersAdd);

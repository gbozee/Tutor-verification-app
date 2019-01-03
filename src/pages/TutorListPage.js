/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import {  Flex, Button } from "@rebass/emotion";
import React from "react";
import { ListItem } from "tuteria-shared/lib/shared/reusables";
import { Link } from "react-router-dom";
import { DataContext } from "tuteria-shared/lib/shared/DataContext";
import { SpinnerContainer } from "tuteria-shared/lib/shared/primitives/Spinner";

import { DateFilter } from "tuteria-shared/lib/shared/DateFilter";
function determineAge(date) {
  let year = new Date(date).getFullYear();

  return new Date().getFullYear() - year;
}
export class TutorListPage extends React.Component {
  static contextType = DataContext;

  state = {
    tutors: [],
    selection: '',
  };
  static defaultProps = {
    detailPageUrl: () => {},
  };
  componentDidMount() {
    this.fetchList(true);
  }
  workedOn = slug => {};
  fetchList = (refresh = false) => {
    let { dispatch, actions } = this.context;
    dispatch({
      type: actions.GET_UNVERIFIED_TUTORS,
      value: { refresh, selection: this.state.selection },
    }).then(data => {
      this.setState({ tutors: data });
    });
  };
  refreshList = () => {
    this.fetchList(true);
  };
  getState = (location = []) => {
    if (location) {
      let result = location[0] || {};
      return result.state;
    }
  };
  render() {
    return (
      <SpinnerContainer condition={this.state.tutors.length === 0}>
        <Flex flexDirection="column">
          <Flex
            flexDirection="row-reverse"
            justifyContent="space-between"
            pr={2}
            pb={3}
            width={1}
          >
            <Button
              css={css`
                :active {
                  opacity: 0.7;
                }
                :hover {
                  cursor: pointer;
                }
              `}
              onClick={this.refreshList}
            >
              Fetch More Records
            </Button>
            <Flex flexDirection="column">
              <DateFilter
                displayDate={false}
                selection={this.state.selection}
                onFilterChange={e =>
                  this.setState(
                    { tutors: [], selection: e.target.value },
                    () => {
                      this.fetchList();
                    }
                  )
                }
                placeholder="Search by email"
                filterOptions={[
                  { value: '', label: 'All' },
                  {
                    value: "new_applicants",
                    label: "New Applicants Only"
                  },
                  { value: 'verified_tutors', label: 'Verified Tutors' },
                ]}
              />
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            {this.state.tutors.map(tutor => (
              <ListItem
                key={tutor.slug}
                date={`Age (${determineAge(tutor.dob)})`}
                heading={tutor.full_name}
                subHeading={this.getState(tutor.locations)}
                gender={tutor.gender}
                rightSection={tutor.email_verified}
                to={this.props.detailPageUrl(tutor.slug)}
                verified={tutor.verified}
                Link={Link}
              />
            ))}
          </Flex>
        </Flex>
      </SpinnerContainer>
    );
  }
}
export default TutorListPage;

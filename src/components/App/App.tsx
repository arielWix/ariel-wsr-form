import React from 'react';
import {
  Layout,
  Cell,
  Card,
  FormField,
  Input,
  Dropdown,
  WixStyleReactProvider,
  Button,
  Heading,
  Page,
  Box,
  Text,
  Breadcrumbs,
  IconButton,
  AddItem,
} from 'wix-style-react';

import DeleteSmall from 'wix-ui-icons-common/DeleteSmall';

const colorOptions = [
  {
    id: 0,
    value: 'Red',
  },
  {
    id: 1,
    value: 'Blue',
  },
  {
    id: 2,
    value: 'Green',
  },
  {
    id: 3,
    value: 'Yellow',
  },
  {
    id: 4,
    value: 'Pink',
  },
];

const breadCrumbsItems = [
  {
    id: 1,
    value: 'Root Page',
  },
  {
    id: 2,
    value: 'WSR Form',
  },
];

interface ISavedData {
  firstName: string;
  lastName: string;
  color: string;
}

const SavedData = ({ firstName, lastName, color }: ISavedData) => (
  <Card>
    <Card.Header title="Saved data" />
    <Card.Divider />
    <Card.Content>
      <Layout>
        <Cell>
          <Heading appearance="H6">FIRST NAME</Heading>
          <Text>{firstName}</Text>
        </Cell>
        <Cell>
          <Heading appearance="H6">LAST NAME</Heading>
          <Text>{lastName}</Text>
        </Cell>
        <Cell>
          <Heading appearance="H6">FAVORITE COLOR</Heading>
          <Text>{color}</Text>
        </Cell>
      </Layout>
    </Card.Content>
  </Card>
);

interface IRoleDetails {
  title: string;
  experience: string;
}

const RoleData = ({ title, experience }: IRoleDetails) => (
  <Card>
    <Card.Header
      title="Role details"
      suffix={
        <Button disabled priority="secondary">
          Edit
        </Button>
      }
    />
    <Card.Divider />
    <Card.Content>
      <Layout>
        <Cell>
          <Heading appearance="H6">OFFICIAL TITLE</Heading>
          <Text>{title}</Text>
        </Cell>
        <Cell>
          <Heading appearance="H6">EXPERIENCE</Heading>
          <Text>{experience}</Text>
        </Cell>
      </Layout>
    </Card.Content>
  </Card>
);

export default class extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    colorSelectedId: -1,
    roleTitle: 'Keyboard',
    roleExperience: 'Its over nine thousand',
    savedData: {
      firstName: '',
      lastName: '',
      color: '',
    },
  };

  render() {
    const canClear =
      !!this.state.firstName ||
      !!this.state.lastName ||
      this.state.colorSelectedId !== -1;
    const canSubmit =
      !!this.state.firstName &&
      !!this.state.lastName &&
      this.state.colorSelectedId !== -1;

    return (
      <WixStyleReactProvider>
        <Page height="100vh">
          <Page.Header
            title="WSR Form"
            breadcrumbs={<Breadcrumbs items={breadCrumbsItems} activeId={2} />}
            actionsBar={
              <Box>
                <Box marginRight="small">
                  <Button
                    disabled={!canClear}
                    priority="secondary"
                    onClick={() => {
                      this.setState({
                        firstName: '',
                        lastName: '',
                        colorSelectedId: -1,
                      });
                    }}
                  >
                    Clear
                  </Button>
                </Box>
                <Box>
                  <Button
                    disabled={!canSubmit}
                    onClick={() => {
                      this.setState({
                        savedData: {
                          firstName: this.state.firstName,
                          lastName: this.state.lastName,
                          color: colorOptions[this.state.colorSelectedId].value,
                        },
                      });
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            }
          />
          <Page.Content>
            <Layout>
              <Cell span={8}>
                <Card>
                  <Card.Header title="General Info" />
                  <Card.Divider />
                  <Card.Content>
                    <Layout>
                      <Cell>
                        <Layout>
                          <Cell span={6}>
                            <FormField label="First name" required>
                              <Input
                                value={this.state.firstName}
                                onChange={(e) =>
                                  this.setState({ firstName: e.target.value })
                                }
                              />
                            </FormField>
                          </Cell>
                          <Cell span={6}>
                            <FormField label="Last name" required>
                              <Input
                                value={this.state.lastName}
                                onChange={(e) =>
                                  this.setState({ lastName: e.target.value })
                                }
                              />
                            </FormField>
                          </Cell>
                        </Layout>
                      </Cell>
                      <Cell>
                        <Heading appearance="H5">ADDITIONAL INFO</Heading>
                      </Cell>
                      <Cell>
                        <FormField label="Favorite color">
                          <Layout>
                            <Cell span={11}>
                              <Dropdown
                                selectedId={this.state.colorSelectedId}
                                placeholder="Choose a color"
                                onSelect={(option) =>
                                  this.setState({ colorSelectedId: option.id })
                                }
                                options={colorOptions}
                              />
                            </Cell>
                            <Cell span={1}>
                              <IconButton disabled priority="secondary">
                                <DeleteSmall />
                              </IconButton>
                            </Cell>
                            <Cell>
                              <AddItem disabled>Add New List Item</AddItem>
                            </Cell>
                          </Layout>
                        </FormField>
                      </Cell>
                    </Layout>
                  </Card.Content>
                </Card>
              </Cell>

              <Cell span={4}>
                <Layout>
                  <Cell>
                    <RoleData
                      title={this.state.roleTitle}
                      experience={this.state.roleExperience}
                    />
                  </Cell>
                  <Cell>
                    {this.state.savedData.firstName ? (
                      <SavedData
                        firstName={this.state.savedData.firstName}
                        lastName={this.state.savedData.lastName}
                        color={this.state.savedData.color}
                      />
                    ) : null}
                  </Cell>
                </Layout>
              </Cell>
            </Layout>
          </Page.Content>
        </Page>
      </WixStyleReactProvider>
    );
  }
}

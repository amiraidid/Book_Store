/* eslint-disable react/prop-types */
import { Table } from "flowbite-react";
import { Center, Spinner, Text } from "@chakra-ui/react";

function UserInfo({ listOfUsers, loading }) {
  if (loading) {
    return (
      <Center>
        <Spinner size="xl" thickness="4px" color="purple.500" />
        <Text ml="3">Loading, please wait...</Text>
      </Center>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>First name</Table.HeadCell>
          <Table.HeadCell>Last</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {
            listOfUsers.map((user) => (
              <Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.name}</Table.Cell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                {/* <Table.Cell>
                  <Button variant="outline" colorScheme="purple">Edit</Button>
                  <Button variant="outline" color={'red'} ml={'3'} colorScheme="purple">Delete</Button>
                </Table.Cell> */}
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    </div>
  );
}

export default UserInfo;

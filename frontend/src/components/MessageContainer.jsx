useEffect(() => {
  if (selectedUser?._id) {
    getMessages(selectedUser._id);
    subscribeToMessages();
  }

  return () => {
    unsubscribeFromMessages();
  };
}, [selectedUser, subscribeToMessages, unsubscribeFromMessages]);

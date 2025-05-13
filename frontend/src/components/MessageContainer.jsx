useEffect(() => {
  if (selectedUser?._id) {
    getMessages(selectedUser._id);
    subscribeToMessages();
  }

  return () => {
    unsubscribeFromMessages();
  };
<<<<<<< HEAD
<<<<<<< HEAD
}, [selectedUser, subscribeToMessages, unsubscribeFromMessages]);
=======
}, [selectedUser, subscribeToMessages, unsubscribeFromMessages]);
>>>>>>> origin/mimi
=======
}, [selectedUser, subscribeToMessages, unsubscribeFromMessages]);
>>>>>>> origin/tasks

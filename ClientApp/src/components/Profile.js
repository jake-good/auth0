import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [privateData, setPrivateData] = useState(null);
  const [privateScopedData, setPrivateScopedData] = useState(null);

  useEffect(() => {
    const getPrivateEndpoint = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch('auth/private', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }});
        const data = await response.json();
        setPrivateData(data);
      } catch (e) {
        console.log(e)
      }
    };

      const getPrivateScopedEndpoint = async () => {
          try {
              const accessToken = await getAccessTokenSilently();
              const response = await fetch('auth/private-scoped', {
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                  }});
              const data = await response.json();
              setPrivateScopedData(data);
          } catch (e) {
              console.log(e)
          }
      };

      getPrivateEndpoint();
      getPrivateScopedEndpoint();
        
  }, [getAccessTokenSilently, user?.sub]);

  return (
      isAuthenticated && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <h3>User Metadata</h3>
            {privateData ? (
                <>
                    <pre>{JSON.stringify(privateData, null, 2)}</pre>
                    <pre>{JSON.stringify(privateScopedData, null, 2)}</pre>
                </>
            ) : (
                "No user metadata defined"
            )}
          </div>
      )
  );
};

export default Profile;
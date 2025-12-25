nest js backend media library project
---


At the /auth/register endpoint, we can create an account using our username and password and receive an accessToken and a refreshToken


<img width="953" height="645" alt="Ekran görüntüsü 2025-12-25 125623" src="https://github.com/user-attachments/assets/6983fe14-fc58-4354-8669-23acf697135f" />

<img width="960" height="499" alt="Ekran görüntüsü 2025-12-25 125631" src="https://github.com/user-attachments/assets/c258122b-f40f-44c9-809b-5c8536d013eb" />


We can see the user we created via MongoDB Atlas


<img width="622" height="153" alt="Ekran görüntüsü 2025-12-25 125922" src="https://github.com/user-attachments/assets/4709fb19-4c5b-4161-bafe-18e53c20df1a" />


We can log in to an existing user using the /auth/login endpoint, which generates an accessToken and a refreshToken for us


<img width="1140" height="753" alt="Ekran görüntüsü 2025-12-25 130024" src="https://github.com/user-attachments/assets/5ea6139e-a3e2-47af-b830-16eb52990cb3" />
<img width="1142" height="596" alt="Ekran görüntüsü 2025-12-25 130033" src="https://github.com/user-attachments/assets/1cd68a96-b00c-4288-91da-0097b58f67f5" />


Users can refresh their accessToken and refreshToken using the /auth/refresh


<img width="951" height="842" alt="Ekran görüntüsü 2025-12-25 130214" src="https://github.com/user-attachments/assets/27a082d8-51b7-4ab6-af85-fac7ea640ac3" />
<img width="954" height="276" alt="Ekran görüntüsü 2025-12-25 130221" src="https://github.com/user-attachments/assets/39f539d5-8ce3-489e-b6d4-07db8d937246" />

also our application's main endpoint returns a message saying "hi"


<img width="1406" height="911" alt="Ekran görüntüsü 2025-12-24 164905" src="https://github.com/user-attachments/assets/fa32586c-d59e-4f61-aa52-ccca3e4ac1f3" />

To be able to use the following endpoints, we need to be authorized, as requested in the task also


<img width="518" height="232" alt="Ekran görüntüsü 2025-12-25 130318" src="https://github.com/user-attachments/assets/6163c705-49d9-4fa7-ba9c-dfe51d210a72" />


Once authorized, we can view our own information with a /users/me GET request


<img width="1137" height="947" alt="Ekran görüntüsü 2025-12-25 130351" src="https://github.com/user-attachments/assets/e283df94-b865-41c4-a6c3-5365a78ee0e1" />


We can upload a JPEG file smaller than 5 MB


<img width="1143" height="1284" alt="Ekran görüntüsü 2025-12-25 140657" src="https://github.com/user-attachments/assets/e42ed19a-ad73-41c6-aea9-bfdd907140ad" />
<img width="748" height="634" alt="Ekran görüntüsü 2025-12-25 140732" src="https://github.com/user-attachments/assets/7f375841-5414-49e7-a045-85081207eeb1" />


We can see all the jpeg files we uploaded


<img width="1137" height="939" alt="Ekran görüntüsü 2025-12-25 130844" src="https://github.com/user-attachments/assets/958e2356-684c-4dda-8fc6-751c036bb6ef" />
<img width="1139" height="380" alt="Ekran görüntüsü 2025-12-25 130852" src="https://github.com/user-attachments/assets/5df4e7d6-98ac-4795-85c7-70b614c21e13" />


allowed users can view the metadata of a media file via using objectid of media


<img width="1126" height="817" alt="Ekran görüntüsü 2025-12-25 130923" src="https://github.com/user-attachments/assets/7cd1f397-8a14-45aa-b9d8-015d18a84c0c" />
<img width="1140" height="423" alt="Ekran görüntüsü 2025-12-25 130930" src="https://github.com/user-attachments/assets/6b735f4f-335d-42d7-8789-0f5737306a4a" />


Owners can delete their own media


<img width="1136" height="845" alt="Ekran görüntüsü 2025-12-25 131101" src="https://github.com/user-attachments/assets/984a6916-2a01-4e31-91f7-05825b05fe6e" />
<img width="1138" height="348" alt="Ekran görüntüsü 2025-12-25 131110" src="https://github.com/user-attachments/assets/c5ae8b0b-7b79-446e-9ea0-673f16ae2351" />


allowed users can download jpeg file


<img width="1134" height="687" alt="Ekran görüntüsü 2025-12-25 131225" src="https://github.com/user-attachments/assets/0e17d0eb-ce04-4e62-bcd8-5f9b65170f3f" />
<img width="449" height="136" alt="Ekran görüntüsü 2025-12-25 131233" src="https://github.com/user-attachments/assets/372cb8b6-7560-4f5c-8107-391bc59e06c2" />


users can view other users they allowed by entering the object id of their media


<img width="1141" height="734" alt="Ekran görüntüsü 2025-12-25 131316" src="https://github.com/user-attachments/assets/81e2e3ca-e19e-4261-a560-fee7fe8e93d4" />
<img width="1145" height="352" alt="Ekran görüntüsü 2025-12-25 131323" src="https://github.com/user-attachments/assets/3f06d8db-e335-4d92-a2b4-f8bf9152e3b9" />


now with using this two users, differentuser@gmail.com will upload a jpeg file, then give user@gmail.com to permission to see it.


<img width="631" height="328" alt="Ekran görüntüsü 2025-12-25 132500" src="https://github.com/user-attachments/assets/89c075b1-6f8f-401e-8956-108d03d1595e" />


differentuser@gmail.com uploads a picture and gives user@gmail.com permission


<img width="993" height="748" alt="Ekran görüntüsü 2025-12-25 132531" src="https://github.com/user-attachments/assets/db8c136f-2632-4fa8-883a-8998fc17391a" />
<img width="997" height="740" alt="Ekran görüntüsü 2025-12-25 132538" src="https://github.com/user-attachments/assets/d1a9b74b-b6fe-49d6-8153-b5b256e8af17" />


now user@gmail.com allowed to see and download the picture


<img width="392" height="219" alt="Ekran görüntüsü 2025-12-25 132735" src="https://github.com/user-attachments/assets/f50c22c4-e214-44bf-a4fa-6eeef6952b43" />


we can also remove a permission with using the same API endpoint


<img width="990" height="949" alt="Ekran görüntüsü 2025-12-25 132559" src="https://github.com/user-attachments/assets/daad2897-eee0-46bb-ae98-ac3e5a36d5c8" />


These were the test cases for our project. If there are any cases we missed or if you'd like to add any, please feel free to contact me. Thank you for your time, and have a great day.

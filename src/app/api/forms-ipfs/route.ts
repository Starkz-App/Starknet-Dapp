import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { pinataClient } from '../../../utils/pinataClient';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(request: NextRequest){
    try{
      const data = await request.formData();

      const title = data.get('title') as unknown as string;
      const content = data.get('content') as unknown as string;
      const slug = data.get('slug');
      const collection = data.get('collection') as string;
      const categories = data.getAll('categories');

      // const data2 = request.body;
      // console.log(data2);

      // console.log("--------------");
      // const data3 = request.text();
      // console.log(data3);
  
      //const file: File | null = data.get("file") as unknown as File;

      // const uploadMockedData = await pinataClient.upload.json(mockedData);
      // const mockedUrl = await pinataClient.gateways.convert(uploadMockedData.IpfsHash);
      // console.log(mockedUrl);

      // console.log('Received data:', { title, content, slug, collection, categories: categories?.name });

      const userObject = {
        title,
        content,
        slug,
        collection,
        categories
      };

      // console.log('Attempting to upload to Pinata:', userObject);

      const uploadData = await pinataClient.upload.json(userObject);
      // console.log('Pinata upload successful:', uploadData);
      const url = await pinataClient.gateways.convert(uploadData.IpfsHash);
      // console.log('Converted IPFS URL:', url);

      //aqui eu chamo a função de MINTAR
      return NextResponse.json({ ipfsHash: uploadData.IpfsHash, url }, { status: 200 });
      // const data = await request.formData();
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    } 
  }
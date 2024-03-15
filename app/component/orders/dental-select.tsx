"use client";

import { useEffect, useState } from "react";

interface Props {
  onSelect?: (value: number[]) => void;
}

const DentalSelect = (props: Props) => {
  const { onSelect } = props;
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    if (onSelect) {
      onSelect(selected);
    }
  }, [onSelect, selected]);

  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="flex justify-center">
        <div className="flex m-2">
          <div
            onClick={() => {
              if (selected?.includes(18)) {
                const remove = selected.filter((item) => item !== 18);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 18]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(18) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>18</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(17)) {
                const remove = selected.filter((item) => item !== 17);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 17]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(17) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>17</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(16)) {
                const remove = selected.filter((item) => item !== 16);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 16]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(16) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>16</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(15)) {
                const remove = selected.filter((item) => item !== 15);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 15]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(15) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>15</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(14)) {
                const remove = selected.filter((item) => item !== 14);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 14]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(14) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>14</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(13)) {
                const remove = selected.filter((item) => item !== 13);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 13]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(13) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>13</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(12)) {
                const remove = selected.filter((item) => item !== 12);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 12]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(12) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>12</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(11)) {
                const remove = selected.filter((item) => item !== 11);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 11]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(11) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>11</span>
          </div>
        </div>
        <div className="h-22 w-[0.125rem] bg-white" />
        <div className="flex m-2">
          <div
            onClick={() => {
              if (selected?.includes(21)) {
                const remove = selected.filter((item) => item !== 21);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 21]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(21) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>21</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(22)) {
                const remove = selected.filter((item) => item !== 22);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 22]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(22) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>22</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(23)) {
                const remove = selected.filter((item) => item !== 23);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 23]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(23) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>23</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(24)) {
                const remove = selected.filter((item) => item !== 24);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 24]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(24) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>24</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(25)) {
                const remove = selected.filter((item) => item !== 25);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 25]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(25) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>25</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(26)) {
                const remove = selected.filter((item) => item !== 26);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 26]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(26) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>26</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(27)) {
                const remove = selected.filter((item) => item !== 27);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 27]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(27) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>27</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(28)) {
                const remove = selected.filter((item) => item !== 28);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 28]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(28) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>28</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[0.1rem] bg-white" />

      <div className="flex justify-center">
        <div className="flex m-2">
          <div
            onClick={() => {
              if (selected?.includes(48)) {
                const remove = selected.filter((item) => item !== 48);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 48]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(48) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>48</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(47)) {
                const remove = selected.filter((item) => item !== 47);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 47]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(47) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>47</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(46)) {
                const remove = selected.filter((item) => item !== 46);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 46]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(46) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>46</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(45)) {
                const remove = selected.filter((item) => item !== 45);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 45]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(45) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>45</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(44)) {
                const remove = selected.filter((item) => item !== 44);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 44]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(44) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>44</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(43)) {
                const remove = selected.filter((item) => item !== 43);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 43]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(43) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>43</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(42)) {
                const remove = selected.filter((item) => item !== 42);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 42]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(42) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>42</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(41)) {
                const remove = selected.filter((item) => item !== 41);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 41]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(41) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>41</span>
          </div>
        </div>
        <div className="h-22 w-[0.125rem] bg-white" />
        <div className="flex m-2">
          <div
            onClick={() => {
              if (selected?.includes(31)) {
                const remove = selected.filter((item) => item !== 31);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 31]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(31) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>31</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(32)) {
                const remove = selected.filter((item) => item !== 32);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 32]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(32) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>32</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(33)) {
                const remove = selected.filter((item) => item !== 33);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 33]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(33) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>33</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(34)) {
                const remove = selected.filter((item) => item !== 34);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 34]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(34) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>34</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(35)) {
                const remove = selected.filter((item) => item !== 35);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 35]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(35) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>35</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(36)) {
                const remove = selected.filter((item) => item !== 36);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 36]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(36) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>36</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(37)) {
                const remove = selected.filter((item) => item !== 37);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 37]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(37) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>37</span>
          </div>
          <div
            onClick={() => {
              if (selected?.includes(38)) {
                const remove = selected.filter((item) => item !== 38);
                setSelected([...remove]);
              } else {
                setSelected([...selected, 38]);
              }
            }}
            className={`h-20 w-8 flex justify-center items-center cursor-pointer ${
              selected?.includes(38) ? "bg-company-blue text-white" : "bg-white"
            }`}
          >
            <span>38</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentalSelect;

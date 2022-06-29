package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author : M-Prageeth
 * @created : 25/06/2022 - 9:26 AM
 **/
@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepo repo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveItem(ItemDTO dto) {
        if (!repo.existsById(dto.getCode())) {
            repo.save(mapper.map(dto, Item.class));
        } else {
            throw new RuntimeException("Item already exists...");
        }
    }

    @Override
    public void updateItem(ItemDTO dto) {
        if (repo.existsById(dto.getCode())) {
            repo.save(mapper.map(dto, Item.class));
        } else {
            throw new RuntimeException("No Such Item To Update...");
        }
    }

    @Override
    public void deleteItem(String code) {
        if (repo.existsById(code)) {
            repo.deleteById(code);
        } else {
            throw new RuntimeException("No Such Item To Delete");
        }
    }

    @Override
    public ItemDTO searchItem(String code) {
        if (repo.existsById(code)) {
            return mapper.map(repo.findById(code).get(), ItemDTO.class);
        } else {
            throw new RuntimeException("No Such Item Found...");
        }
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return mapper.map(repo.findAll(), new TypeToken<List<ItemDTO>>() {
        }.getType());
    }

    @Override
    public String generateItemCode() {
        String lastCode = repo.findLastItem();
        String code = "";

        if (lastCode != null) {
            int tempCode = Integer.parseInt(lastCode.split("-")[1]);
            tempCode = tempCode + 1;
            if (tempCode <= 9) {
                code = "I00-000" + tempCode;
            } else if (tempCode <= 99) {
                code = "I00-00" + tempCode;
            } else if (tempCode <= 999) {
                code = "I00-0" + tempCode;
            } else if (tempCode <= 9999) {
                code = "I00-" + tempCode;
            }
        } else {
            code = "I00-0001";
        }
        return code;
    }
}
